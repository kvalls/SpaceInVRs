using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Starting AuthController.Signin...");

        var newLogin = Constructors.NewUserLogin("tiburcio@gmail.com", "hola");
        StartCoroutine(AuthController.Signin(newLogin));
    }

    // void RDTest()
    // {
    //     Debug.Log("Starting RecordController.Create...");
    //     StartCoroutine(RecordController.Create(
    //         new Session( "", "clbmfl0x90000o7i4eff7jn4c", 9, 2, 12345329) 
    //     ));
    // }

    // Update is called once per frame
    void Update()
    {

    }
}