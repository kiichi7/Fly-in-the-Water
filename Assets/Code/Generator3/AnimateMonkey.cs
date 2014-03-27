using UnityEngine;
using System.Collections;

[RequireComponent (typeof (Animation))]
[AddComponentMenu("Generator3/Behaviors/Dance Monkey, DANCE")]

public class AnimateMonkey : MonoBehaviour {
	
	public KeyCode keyToDance;

	// Use this for initialization
	void Start () {
		
		foreach (AnimationState state in animation) 
		{	
			state.enabled = true;
			state.wrapMode = WrapMode.Once;
			state.blendMode = AnimationBlendMode.Blend;
		}
	
	}
	
	public void LateUpdate()
	{
		if (Input.GetKeyDown(keyToDance))
		{
			animation.Play();
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}

