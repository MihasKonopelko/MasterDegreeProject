// File: name_generator.js
/* Line Length ruler.
----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
         10        20        30        40        50        60        70        80        90        100
*/

/**
 * This class generates names.  Can be used for monsters, NPCs and 
 * items
 */
class NameGenerator {
	constructor(){}
	
	/**
	 * Returns absolutely random adjective.
	 * @returns {string} The adjective.
	 */
	getRandomAdjective() {
		const adjectives = [
			'attractive',
			'beautiful',
			'clean',
			'dazzling',
			'elegant',
			'fancy',
			'glamorous',
			'floaty', 
			'flying',
			'purple',
			'red'
		];
	
		const RANDOM = Math.floor(Math.random() * Math.floor(adjectives.length));
		return adjectives[RANDOM].charAt(0).toUpperCase() + adjectives[RANDOM].slice(1);
	}

	// More code.
	
}
		
		
		
		
		
		
		
		
		
		