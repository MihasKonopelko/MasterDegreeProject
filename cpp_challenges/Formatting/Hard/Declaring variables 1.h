// File: Position.h
// Line Length ruler.
//--|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
//       10        20        30        40        50        60        70        80        90        100       110       120
//

/// <summary>
/// @author Ash Smith
/// @version 1.0
/// 
/// </summary>

#ifndef POSITION_H
#define POSITION_H

/// <summary>
/// @brief A basic position struct.
/// 
/// Stores position on x, y, z axises.
/// </summary>
struct Position
{
public:
	/// Position on X-axis.
	double x;
	/// Position on Y-axis.
	double y;
	/// Position on Z-axis.
	double z;
};

#endif // !POSITION_H