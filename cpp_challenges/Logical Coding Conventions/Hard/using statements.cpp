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

using namespace sf;

/// <summary>
/// @brief Main loop.
/// This method executes an update and render loop of this 
/// game, as well as initializes assests.
/// </summary>
int main()
{
	// Creates Window.
	RenderWindow window(VideoMode(800, 600), "Apple Game");

	srand(time(NULL));

	const int NUMBER_OF_APPLES = 10;
	RectangleShape apples[NUMBER_OF_APPLES];
	
	RectangleShape player;
	
	for (int i = 0; i < NUMBER_OF_APPLES; i++)
	{
		apples[i].setSize(Vector2f(20, 20));
		apples[i].setPosition(rand() % 780, rand() % 580);
	}

	player.setSize(Vector2f(20, 20));
	player.setFillColor(Color::Red);
	player.setPosition(rand() % 780, rand() % 580);
	

	// set timePerFrame to 1 60th of a second. 60 frames per second
	Time timePerFrame = seconds(1.0f / 60.0f);
	Time timeSinceLastUpdate = Time::Zero;
	
	// the clock object keeps the time.
	Clock clock;
	clock.restart();

	while (window.isOpen())
	{
		// More inner logic
	}
	return 0;
}


