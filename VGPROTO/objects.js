var SpriteObject = function ()
{

	this.x = 0;
	this.y = 0;
	this.w = 32;
	this.h = 32;

	this.srcX = 0;
	this.srcY = 0;
	this.srcW = 32;
	this.srcH = 32;

	this.ay = 0;
	this.ax = 0;
	this.vx = 0;
	this.vy = 0;
	
	this.friction = 0.96;
	this.bounce = -0.7;
	this.gravity = 0.3;
	
	this.jumpForce = -10;
	this.isOnGround = undefined;
	
	this.visible = true;

	this.left = function ()
	{
		return this.x;
	};

	this.right = function ()
	{
		return this.x + this.w;
	};

	this.top = function ()
	{
		return this.y;
	};

	this.bottom = function ()
	{
		return this.y + this.h;
	};

	this.center = function ()
	{
		return {
			x: this.x + (this.w / 2),
			y: this.y + (this.h / 2)
		};
	};

	this.halfWidth = function ()
	{
		return this.w / 2;
	};

	this.halfHeight = function ()
	{
		return this.h / 2;
	};
};

var MessageObject = function ()
{
	this.x = 0;
	this.y = 0;
	this.visible = true;
	this.font = "normal bold 20px Helvetica";
	this.fontStyle = "black";
	this.textBaseline = "top";
	this.text = "message";
};