/**
 * checks to see if am x and y cord is in a SpriteObject
 * @param {int} px x of point
 * @param {int} py y of point
 * @param {SpriteObject} r SpriteObject checking hit on
 * @returns {Boolean} true if hit, false if miss
 */
function hitTestPoint(px, py, r)
{
	var hit = false;

	if (px > r.left() && px < r.right() && py > r.top() && py < r.bottom())
		hit = true;

	return hit;
}
/**
 * checks to see if 2 SpriteObjects are overlapping, or colliding
 * @param {SpriteObject} r1 first SpriteObject
 * @param {SpriteObject} r2 second SpriteObject
 * @returns {Boolean} true if hit, false if miss
 */
function hitTestRectangle(r1, r2)
{
	var hit = false;

	var dx = r1.center().x - r2.center().x;
	var dy = r1.center().y - r2.center().y;

	var sumHalfWidths = r1.halfWidth() + r2.halfWidth();
	if (Math.abs(dx) < sumHalfWidths)
	{
		var sumHalfHeights = r1.halfHeight() + r2.halfHeight();

		if (Math.abs(dy) < sumHalfHeights)
			hit = true;
	}
	return hit;
}

function hitTestCircle(c1, c2)
{
	var vx = c1.center().x - c2.center().x;
	var vy = c1.center().y - c2.center().y;

	var magnitude = Mathsqrt(vx * vx + vy * vy);
	var totalRadii = c1.halfWidth() + c2.halfWidth();
	var hit = magnitude < totalRadii;

	return hit;
}

function blockCircle(c1, c2)
{
	var vx = c1.center().x - c2.center().x;
	var vy = c1.center().y - c2.center().y;

	var magnitude = Mathsqrt(vx * vx + vy * vy);
	var totalRadii = c1.halfWidth() + c2.halfWidth();
	if (magnitude < totalRadii)
	{
		var overlap = totalRadii - magnitude;
		dx = vx / magnitude;
		dy = vy / magnitude;

		c1.x += overlap * dx;
		c1.y += overlap * dy;
	}
}

function blockRectangle(r1, r2)
{
	var collisionSide = "";

	var vx = r1.center().x - r2.center().x;
	var vy = r1.center().y - r2.center().y;

	var sumHalfWidths = r1.halfWidth() + r2.halfWidth();
	if (Math.abs(dx) < sumHalfWidths)
	{
		var sumHalfHeights = r1.halfHeight() + r2.halfHeight();

		if (Math.abs(dy) < sumHalfHeights)
		{
			var overlapX = sumHalfWidths - Mathabs(vx);
			var overlapY = sumHalfHeights - Mathabs(vy);

			if (overlapX >= overlapY)
			{
				if (vy > 0)
				{
					collisionSide = "top";
					r1.y = r1.y + overlapY;
				}
				else
				{
					collisionSide = "bottom";
					r1.y = r1.y - overlapY;
				}
			}
			else
			{
				if (vx > 0)
				{
					collisionSide = "left";

					r1.x = r1.x + overlapX;
				}
				else
				{
					collisionSide = "right";

					r1.x = r1.x - overlapX;
				}
			}
		}
		else
		{
			collisionSide = "none";
		}
	}
	else
	{
		collisionSide = "none";
	}
	return collisionSide;
}
