// File: Main.cpp
// Line Length ruler.
//--|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
//       10        20        30        40        50        60        70        80        90        100       110       120
//

/// <summary>
/// @author Jack Connor
/// @version 2.0
/// 
/// </summary>

#include "Shuffleboard.h"

/// <summary>
/// @brief Constructor for the shuffleboard.
/// Calls a method to create an entity and a node for it.
/// </summary>
/// <param name="t_sceneMan">A pointer to the Scene manager</param>	
Shuffleboard::Shuffleboard(SceneManager *t_sceneMan) :
	m_sceneManager(sceneMan) 
{
	initialise();
}

/// <summary>
/// @brief Initializes the shuffleboard.
/// Creates an entity to hold a 3d model of a board, then a node to which
/// the entity will be attached.
/// </summary>
void Shuffleboard::initialise() 
{
	// Teacher asked to declare pointers before initialisation.  So I did it.
	Entity *entity = 0;
	SceneNode *root = nullptr;
	SceneNode *node = NULL;
	
	entity = m_sceneManager->createEntity("Shuffleboard", "Shuffleboard.mesh");

	root = m_sceneManager->getRootSceneNode();
	node = root->createChildSceneNode("node_shuffleboard");
	
	node->attachObject(entity);	
	node->setPosition(0, 0, 0);
}