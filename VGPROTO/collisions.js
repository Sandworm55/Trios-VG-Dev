function hitTestRectangle(r1,r2){
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