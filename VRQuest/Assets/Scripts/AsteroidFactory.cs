using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AsteroidFactory : MonoBehaviour
{
    
    [Header("Settings")]
    [Tooltip("Spawn Radius")][SerializeField] private float spawnRadius = 15f;
    [Tooltip("Despawn timer")][SerializeField] private float spawnDelay = 5f;

    [Header("Asteroids")]
    [Tooltip("Max nº of Asteroids")][SerializeField] private float maxAsteroids = 10;
    [Tooltip("Speed")][SerializeField] private float speed = 100f;
    [Tooltip("Asteroids")][SerializeField] GameObject[] asteroids;


    private Vector3 center;    
    private int currAsteroids;


    // Start is called before the first frame update
    void Start()
    {
        center = this.transform.position;
        currAsteroids = 0;
        // Invoke("ComeForthMyDearRock", spawnDelay);
        StartCoroutine(ChargeForthMyDearRocks());
    }

    // Update is called once per frame
    void Update()
    {
    }

    IEnumerator ChargeForthMyDearRocks() 
    {
        for (;currAsteroids < maxAsteroids; currAsteroids++) 
        {
            yield return new  WaitForSeconds(spawnDelay);
            ComeForthMyDearRock(); 
        }
    }

    void ComeForthMyDearRock() 
    {
        // Instantiate a random asteroid from the ones assigned to the script
        GameObject rock = Instantiate(
            asteroids[Random.Range(0, asteroids.Length)]
        );

        // Set random position.
        // With the way the map is arranged, Z will stay like that.

        rock.transform.position = new Vector3(
            RandomInRadius(center.x),
            RandomInRadius(center.y),
            center.z
        );

        rock.GetComponent<Rigidbody>().AddForce(
            this.transform.forward * speed,
            ForceMode.Impulse
        );
    }

    private float RandomInRadius(float pos) => 
        Random.Range(pos-spawnRadius, pos+spawnRadius+1);
}
