using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Projectile : MonoBehaviour
{

    [Header("Settings")]
    [Tooltip("Proyectile")][SerializeField] private GameObject prjt;
    [Tooltip("Despawn timer")][SerializeField] private float despawnTimer = 5f;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    void OnCollisionEnter(Collision col) {
        var obj = col.gameObject;
        switch (obj.tag) {
            case "Asteroid":
                Debug.Log("Hit!");
                // obj.GetComponent<Rigidbody>().AddForce(prjt.transform.forward * 100f);
                Global.CurrentSession.score += 100;
                obj.GetComponent<Fracture>().FractureObject();
                // Instantiate(Adios);
                break;

            default:
                break;
        }
        Debug.Log("Lmao");
        // Destroy(prjt);
        // Destroy(this);
        Destroy(gameObject);
    }
}