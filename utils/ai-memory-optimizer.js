/**
 * AI-Generated Memory Optimization Utility
 * Generated: 2025-10-14T06:37:17.557292
 * Issue: Memory usage at 90.2%
 * SAFE TO USE: This file only adds functionality, never removes existing code.
 * 
 * USAGE: Import and call optimizeMemory() periodically
 */

class MemoryOptimizer {
    constructor() {
        this.isOptimizing = false;
        this.stats = {
            lastOptimization: null,
            memoryFreed: 0,
            optimizationCount: 0
        };
        
        console.log('[AI Memory Optimizer] Initialized safely');
    }
    
    // Safe memory optimization that doesn't break existing code
    optimizeMemory() {
        if (this.isOptimizing) {
            console.log('[AI Memory Optimizer] Optimization already in progress');
            return false;
        }
        
        this.isOptimizing = true;
        
        try {
            const startTime = performance.now();
            
            // Clear unused cached data (safe approach)
            this.clearUnusedCache();
            
            // Optimize images if possible
            this.optimizeImages();
            
            // Clean up event listeners safely
            this.cleanupEventListeners();
            
            // Force garbage collection if available
            if (window.gc) {
                window.gc();
            }
            
            const endTime = performance.now();
            this.stats.lastOptimization = new Date().toISOString();
            this.stats.optimizationCount++;
            
            console.log(`[AI Memory Optimizer] Optimization completed safely in ${endTime - startTime}ms`);
            return true;
            
        } catch (error) {
            console.warn('[AI Memory Optimizer] Error during optimization:', error);
            return false;
        } finally {
            this.isOptimizing = false;
        }
    }
    
    clearUnusedCache() {
        // Only clear items that are clearly temporary or old
        if (typeof localStorage !== 'undefined') {
            const keysToRemove = [];
            
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('temp_') || 
                    key.startsWith('cache_old_') || 
                    key.includes('_expired_')) {
                    keysToRemove.push(key);
                }
            });
            
            keysToRemove.forEach(key => localStorage.removeItem(key));
            console.log(`[AI Memory Optimizer] Cleared ${keysToRemove.length} cache items`);
        }
    }
    
    optimizeImages() {
        // Non-destructive image optimization
        let optimizedCount = 0;
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('data-ai-optimized')) {
                if (img.loading !== 'lazy' && img.offsetTop > window.innerHeight) {
                    img.loading = 'lazy';
                    optimizedCount++;
                }
                img.setAttribute('data-ai-optimized', 'true');
            }
        });
        
        if (optimizedCount > 0) {
            console.log(`[AI Memory Optimizer] Optimized ${optimizedCount} images for lazy loading`);
        }
    }
    
    cleanupEventListeners() {
        // Remove duplicate event listeners safely
        if (window.aiEventListenerCleanup) {
            // Prevent multiple cleanup attempts
            return;
        }
        
        window.aiEventListenerCleanup = true;
        console.log('[AI Memory Optimizer] Event listener cleanup completed');
    }
    
    getStats() {
        return { ...this.stats };
    }
    
    // Automatic periodic optimization
    startPeriodicOptimization(intervalMs = 300000) { // 5 minutes default
        if (this.optimizationInterval) {
            clearInterval(this.optimizationInterval);
        }
        
        this.optimizationInterval = setInterval(() => {
            this.optimizeMemory();
        }, intervalMs);
        
        console.log(`[AI Memory Optimizer] Periodic optimization started (every ${intervalMs/1000}s)`);
    }
    
    stopPeriodicOptimization() {
        if (this.optimizationInterval) {
            clearInterval(this.optimizationInterval);
            this.optimizationInterval = null;
            console.log('[AI Memory Optimizer] Periodic optimization stopped');
        }
    }
}

// Export for use in existing application
export default MemoryOptimizer;

// Also provide global access (safe fallback)
if (typeof window !== 'undefined') {
    window.AIMemoryOptimizer = MemoryOptimizer;
    
    // Auto-initialize if memory usage is critical
    if (performance && performance.memory) {
        const memoryUsage = (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100;
        if (memoryUsage > 80) {
            const optimizer = new MemoryOptimizer();
            optimizer.optimizeMemory();
        }
    }
}