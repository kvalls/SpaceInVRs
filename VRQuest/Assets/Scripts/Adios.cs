using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Adios : MonoBehaviour
{

    [Header("Settings")]
    [Tooltip("Despawn timer")][SerializeField] private float fadeSpeed = 5f;

    private GameObject adios;

    // Start is called before the first frame update
    void Start()
    {
    
    }

    void Update()
    {
        Color color = adios.GetComponent<MeshRenderer>().material.color;
        color.a -= Time.deltaTime * fadeSpeed;
        if (color.a <= 0f) {
            GameObject.Destroy(adios);
        }
    }
}