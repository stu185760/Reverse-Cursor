/**
 * Input Validation & Sanitization Utilities
 * Protects against XSS, injection attacks, and DoS
 */

// Length limits to prevent DoS
export const VALIDATION_LIMITS = {
  TITLE_MIN: 3,
  TITLE_MAX: 100,
  DESCRIPTION_MIN: 10,
  DESCRIPTION_MAX: 2000,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 1000,
  BIO_MAX: 500,
  BUSINESS_NAME_MAX: 100,
} as const

/**
 * Sanitize HTML input to prevent XSS
 * Note: Install isomorphic-dompurify for production use
 */
export function sanitizeHTML(input: string): string {
  if (typeof window === 'undefined') {
    // Server-side: basic sanitization
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }

  // Client-side: Use DOMPurify if available
  // For now, basic sanitization
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

/**
 * Validate and sanitize text input
 */
export function validateText(
  input: string,
  options: {
    minLength?: number
    maxLength?: number
    fieldName?: string
    sanitize?: boolean
  } = {}
): { valid: boolean; sanitized: string; error?: string } {
  const {
    minLength = 0,
    maxLength = 10000,
    fieldName = 'Input',
    sanitize = true,
  } = options

  // Check if empty
  const trimmed = input.trim()
  if (!trimmed) {
    return {
      valid: false,
      sanitized: '',
      error: `${fieldName} cannot be empty`,
    }
  }

  // Check length
  if (trimmed.length < minLength) {
    return {
      valid: false,
      sanitized: trimmed,
      error: `${fieldName} must be at least ${minLength} characters`,
    }
  }

  if (trimmed.length > maxLength) {
    return {
      valid: false,
      sanitized: trimmed.slice(0, maxLength),
      error: `${fieldName} must be less than ${maxLength} characters`,
    }
  }

  // Check for dangerous patterns
  const dangerousPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick=, onerror=, etc.
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(input)) {
      return {
        valid: false,
        sanitized: sanitizeHTML(input),
        error: `${fieldName} contains potentially dangerous content`,
      }
    }
  }

  const sanitized = sanitize ? sanitizeHTML(trimmed) : trimmed

  return {
    valid: true,
    sanitized,
  }
}

/**
 * Validate ad input
 */
export function validateAdInput(input: {
  title: string
  description: string
}): { valid: boolean; errors: Record<string, string>; sanitized?: typeof input } {
  const errors: Record<string, string> = {}

  const titleResult = validateText(input.title, {
    minLength: VALIDATION_LIMITS.TITLE_MIN,
    maxLength: VALIDATION_LIMITS.TITLE_MAX,
    fieldName: 'Title',
  })

  const descResult = validateText(input.description, {
    minLength: VALIDATION_LIMITS.DESCRIPTION_MIN,
    maxLength: VALIDATION_LIMITS.DESCRIPTION_MAX,
    fieldName: 'Description',
  })

  if (!titleResult.valid) {
    errors.title = titleResult.error!
  }

  if (!descResult.valid) {
    errors.description = descResult.error!
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      title: titleResult.sanitized,
      description: descResult.sanitized,
    },
  }
}

/**
 * Validate quote input
 */
export function validateQuoteInput(input: {
  price: number
  deliveryDays: number
  message: string
}): { valid: boolean; errors: Record<string, string>; sanitized?: typeof input } {
  const errors: Record<string, string> = {}

  // Validate price
  if (isNaN(input.price) || input.price <= 0) {
    errors.price = 'Price must be a positive number'
  }

  if (input.price > 10000000) {
    // 1 crore INR max
    errors.price = 'Price seems unrealistic (max: ₹1,00,00,000)'
  }

  // Validate delivery days
  if (isNaN(input.deliveryDays) || input.deliveryDays <= 0) {
    errors.deliveryDays = 'Delivery days must be a positive number'
  }

  if (input.deliveryDays > 365) {
    errors.deliveryDays = 'Delivery time cannot exceed 1 year'
  }

  // Validate message
  const messageResult = validateText(input.message, {
    minLength: VALIDATION_LIMITS.MESSAGE_MIN,
    maxLength: VALIDATION_LIMITS.MESSAGE_MAX,
    fieldName: 'Message',
  })

  if (!messageResult.valid) {
    errors.message = messageResult.error!
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      price: input.price,
      deliveryDays: input.deliveryDays,
      message: messageResult.sanitized,
    },
  }
}

/**
 * Rate limiting helper (client-side)
 */
const rateLimitStore = new Map<string, number[]>()

export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const attempts = rateLimitStore.get(key) || []

  // Remove old attempts outside the window
  const recentAttempts = attempts.filter((time) => now - time < windowMs)

  if (recentAttempts.length >= maxAttempts) {
    const oldestAttempt = Math.min(...recentAttempts)
    const retryAfter = Math.ceil((oldestAttempt + windowMs - now) / 1000)
    return {
      allowed: false,
      retryAfter,
    }
  }

  // Add new attempt
  recentAttempts.push(now)
  rateLimitStore.set(key, recentAttempts)

  return { allowed: true }
}

/**
 * Clear rate limit for a key (use after successful action)
 */
export function clearRateLimit(key: string): void {
  rateLimitStore.delete(key)
}

