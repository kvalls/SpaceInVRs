using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Despawner : MonoBehaviour
{
    const int DESPAWN_LAYER = 10;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void OnCollisionEnter(Collision col) {
        if (col.gameObject.layer == DESPAWN_LAYER) 
            Destroy(this.gameObject);
    }
}
