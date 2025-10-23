"use client"

import { loadDB, type DB } from "./local-db"

/**
 * Export current localStorage data to JSON file
 */
export function exportData() {
  const db = loadDB()
  const dataStr = JSON.stringify(db, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)
  
  const link = document.createElement("a")
  link.href = url
  link.download = `easycustomized-backup-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  
  URL.revokeObjectURL(url)
  
  return true
}

/**
 * Import data from JSON file
 */
export function importData(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as DB
        
        // Validate basic structure
        if (!data.users || !data.ads || !data.categories) {
          throw new Error("Invalid backup file structure")
        }
        
        localStorage.setItem("easycustomized-db", JSON.stringify(data))
        
        // Show success message
        alert("✅ Data imported successfully! Page will reload.")
        
        // Reload to apply changes
        window.location.reload()
        resolve()
      } catch (error) {
        reject(error instanceof Error ? error : new Error("Failed to parse backup file"))
      }
    }
    
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}

/**
 * Clear all data and reset to defaults
 */
export function clearAllData() {
  if (confirm("⚠️ This will delete ALL data and reset to defaults. Are you sure?")) {
    localStorage.removeItem("easycustomized-db")
    alert("✅ All data cleared! Page will reload.")
    window.location.reload()
  }
}

/**
 * Get database statistics
 */
export function getDataStats() {
  const db = loadDB()
  
  return {
    users: db.users.length,
    ads: db.ads.length,
    quotes: db.quotes.length,
    messages: db.messages.length,
    reviews: db.reviews.length,
    classifieds: db.classifieds?.length || 0,
    threads: db.threads.length,
    flags: db.flags.length,
    storageSize: new Blob([JSON.stringify(db)]).size,
  }
}

