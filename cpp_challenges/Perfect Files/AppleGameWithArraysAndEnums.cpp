// File: Main.cpp
// Line Length ruler.
//--|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
//       10        20        30        40        50        60        70        80        90        100       110       120
//

/// <summary>
/// @mainpage Apples - First SFML Graphic Game.
/// @author Noel O Hara
/// @version 1.3
/// @brief First SFML Graphic Game.
///
/// In this game - you control a player via keyboard to
/// catch apples randomly moving around.
///
/// date & time of each session and time taken
/// Total time taken on this project e.g.
/// 
/// 12/2/17 14:22	80min (1hr 20min)
/// 15/2/17 16:30	25min 
/// 
/// Total Time Taken 1hr 45min
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
        Red = 0, 
        Yellow = 1,
        Green = 2,
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
			case AppleColour::Red:
				apples[i].setFillColor(sf::Color::Red);
				break;

			case AppleColour::Yellow:
				apples[i].setFillColor(sf::Color::Yellow);
				break;	

			case AppleColour::Green:
				apples[i].setFillColor(sf::Color::Green);
				break;	

			default:
				apples[i].setFillColor(sf::Color::White);
				break;	
		}
	}


	player.setSize(sf::Vector2f(20, 20));
	player.setFillColor(sf::Color::White);
	player.setPosition(	rand() % 780, 
						rand() % 580);
	

	// set timePerFrame to 1 60th of a second. 60 frames per second
	sf::Time timePerFrame = sf::seconds(1.0f / 60.0f);
	sf::Time timeSinceLastUpdate = sf::Time::Zero;
	
	// the clock object keeps the time.
	sf::Clock clock;
	clock.restart();

	while (window.isOpen())
	{
		// check if the close window button is clicked on.
		sf::Event event;
		while (window.pollEvent(event))
		{
			if (event.type == sf::Event::Closed)
				window.close();
		}

		//add to the time since last update and restart the clock
		timeSinceLastUpdate += clock.restart();

		//update every 60th of a second
		//only when the time since last update is greater than 1/60 update the world.

		if (timeSinceLastUpdate > timePerFrame)
		{
			// get keyboard input.
			if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left))
			{
				player.move(-5, 0);
			}
			if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right))
			{
				player.move(5, 0);
			}
			if (sf::Keyboard::isKeyPressed(sf::Keyboard::Up))
			{
				player.move(0, -5);
			}
			if (sf::Keyboard::isKeyPressed(sf::Keyboard::Down))
			{
				player.move(0, 5);
			}
	
			for (int i = 0; i < NUMBER_OF_APPLES; i++)
			{
				apples[i].move(rand() % 7-3, rand() % 7-3);
				
				if (apples[i].getGlobalBounds().intersects(player.getGlobalBounds()))
				{
					apples[i].setPosition(-1000, -1000);
				}
			}
			
			window.clear();
			window.draw(player);

			for (int i = 0; i < NUMBER_OF_APPLES; i++)
			{
				window.draw(apples[i]);
			}
			
			window.display();

			// reset the timeSinceLastUpdate to 0 
			timeSinceLastUpdate = sf::Time::Zero;
		}
	}
	return 0;
}


