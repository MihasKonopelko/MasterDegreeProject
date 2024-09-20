// File: image_manager.js
/* Line Length ruler.
----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
         10        20        30        40        50        60        70        80        90        100
*/

/**
 * Stores all the assets needed for the game.
 */
class ImageManager {
	constructor() {
		/** @private @let {!Object } */
		this.cache_ = {};
		/** @private @let {!Array } */
		this.downloadQueue_ = [];
		/** @private @let {!number} */
		this.errorCount_ = 0;		
		/** @private @const {!string} */
		this.RESOURCE_PATH = 'resources/images/';			
		/** @private @let {!number} */
		this.successCount_ = 0;
	}
	
	// More methods
	
}