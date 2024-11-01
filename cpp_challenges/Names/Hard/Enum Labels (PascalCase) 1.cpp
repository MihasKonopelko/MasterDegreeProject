// File: Main.cpp
// Line Length ruler.
//--|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
//       10        20        30        40        50        60        70        80        90        100       110       120
//

/// <summary>
// Big summary content 
/// </summary>

#include "stdafx.h"

#ifdef _DEBUG 
// Some pragma comment library inclusions.
#else 
// Some pragma comment library inclusions.
#endif 

#include <SFML/Graphics.hpp>
#include <iostream>
#include <stdlib.h> 
#include <time.h> 

/// <summary>
/// @brief Main loop.
/// This method executes an update and render loop of this 
/// game, as well as initializes assests.
/// </summary>
int main()
{
	// Setup randomness.
	srand(time(NULL));

	// Creates Window.
	sf::RenderWindow window(sf::VideoMode(800, 600), "Apple Game");
	
	// Represents different Apple Colours
 	enum class AppleColour
    {
        red = 0, 
        Yellow = 1,
    };

	const int NUMBER_OF_APPLES = 10;
	sf::RectangleShape apples[NUMBER_OF_APPLES];

	sf::RectangleShape player;
	
	for (int i = 0; i < NUMBER_OF_APPLES; i++)
	{
		apples[i].setSize(sf::Vector2f(20, 20));
		apples[i].setPosition(	rand() % 780, 
								rand() % 580);
	
		AppleColour colour = static_cast<AppleColour>(rand() % 3);
		switch(colour)
		{
			case AppleColour::red:
				apples[i].setFillColor(sf::Color::Red);
				break;

			case AppleColour::Yellow:
				apples[i].setFillColor(sf::Color::Yellow);
				break;	


			default:
				apples[i].setFillColor(sf::Color::White);
				break;	
		}
	}

	// More logic.

	return 0;
}


