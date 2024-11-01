// File: Main.cpp
// Line Length ruler.
//--|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
//       10        20        30        40        50        60        70        80        90        100       110       120
//

// Doxygen and include statements

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
	
		int colourNumber = rand() % 3;
		AppleColour colour = (AppleColour) colourNumber;
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

	// Inner logic

	return 0;
}


