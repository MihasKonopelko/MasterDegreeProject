// File: Main.cpp
// Line Length ruler.
//--|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
//       10        20        30        40        50        60        70        80        90        100       110       120
//


// Project summary and includes.

/// <summary>
/// @brief Main loop.
/// This method executes an update and render loop of this 
/// game, as well as initializes assests.
/// </summary>
int main()
{
	// Creates Window.
	sf::RenderWindow window(sf::VideoMode(800, 600), "Apple Game");

	srand(time(NULL));

	const int NUMBER_OF_APPLES = 10;
	sf::RectangleShape apples[NUMBER_OF_APPLES];
	
	sf::RectangleShape player;
	
	for (int i = 0; i < NUMBER_OF_APPLES; i++)
	{
		apples[i].setSize(sf::Vector2f(20, 20));
		apples[i].setPosition(rand() % 780, rand() % 580);
	}

	// Testing sizes
	int playerSize = 25;

	player.setSize(sf::Vector2f(playerSize, playerSize));
	player.setFillColor(sf::Color::Red);
	player.setPosition(rand() %780, rand()%580);
	

	// set timePerFrame to 1 60th of a second. 60 frames per second

	sf::Time timePerFrame = sf::seconds(1.0f / 60.0f);
	sf::Time timeSinceLastUpdate = sf::Time::Zero;
	
	// the clock object keeps the time.
	sf::Clock clock;
	clock.restart();

	while (window.isOpen())
	{
		// Loop logic.
	}
	return 0;
}


