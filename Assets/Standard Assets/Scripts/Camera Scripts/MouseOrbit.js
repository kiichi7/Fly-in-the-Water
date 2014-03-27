var target : Transform;

private var mouseX = 0.0;
private var mouseY = 0.0;
private var distance = 10.0;
private var minDistance = 5;
private var maxDistance = 100; 
private var maxSpeed = 3.0;
private var rollSpeed = 3.0;
private var minMouseXY = 0.1;
private var minMouseRoll = 0.01;
private var x = 0.0;
private var y = 0.0;
private var p = 0.0;

@script AddComponentMenu("Camera-Control/Mouse Orbit")

function Start () {
    var angles = transform.eulerAngles;
    mouseX = angles.y;
    mouseY = angles.x;

	// Make the rigid body not change rotation
   	if (rigidbody)
		rigidbody.freezeRotation = true;
}

function Update () {

    if (target) {
        
        if (Input.GetAxis("Mouse X") == 0) {
        	if (x > minMouseXY) x -= minMouseXY;
        	else if (x >= -minMouseXY) x = 0;
        	else x += minMouseXY;
        }
        else x += Input.GetAxis("Mouse X");
        
        if (Input.GetAxis("Mouse Y") == 0) {
        	if (y > minMouseXY) y -= minMouseXY;
        	else if (y >= -minMouseXY) y = 0;
        	else y += minMouseXY;
        }
        else y += Input.GetAxis("Mouse Y");
        
        if (Input.GetAxis("Mouse ScrollWheel") == 0) {
        	if (p > minMouseRoll) p -= minMouseRoll;
        	else if (p >= -minMouseRoll) p = 0;
        	else p += minMouseRoll;
        }
        else p += Input.GetAxis("Mouse ScrollWheel");
        
        if (x < -maxSpeed) x = -maxSpeed;
        else if (x > maxSpeed) x = maxSpeed;
        if (y < -maxSpeed) y = -maxSpeed;
        else if (y > maxSpeed) y = maxSpeed;
        
        if (distance < minDistance) {p=0; distance=minDistance;}
        else if (distance == minDistance) {if (p < 0) p = 0;}
        else if (distance == maxDistance) {if (p > 0) p = 0;}
        else if (distance > maxDistance) {p=0; distance=maxDistance;}
        
        distance += p * rollSpeed;

        
        mouseX += x * Mathf.Sqrt(distance) / 5;
        mouseY -= y * Mathf.Sqrt(distance) / 5;
        
        var rotation = Quaternion.Euler(mouseY, mouseX, 0);
        var position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
        
        transform.rotation = rotation;
        transform.position = position;
    }
}
