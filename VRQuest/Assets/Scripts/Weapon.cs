using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Weapon : MonoBehaviour
{
    [Header("Prefab Refrences")]
    public GameObject proyectile;

    [Header("Location Refrences")]
    [SerializeField] private Transform barrelLocation;

    [Header("Settings")]
    // [Tooltip("Specify time to destory the proyectile object")][SerializeField] private float destroyTimer = 2f;
    [Tooltip("Bullet Speed")][SerializeField] private float shotPower = (float) 0x5F3759DF;
    // [Tooltip("Bullet Speed")][SerializeField] private float shotPower = 500f;
    [Tooltip("Max cooldown")][SerializeField] private float maxCooldown = 1f;


    // Weapon stats
    public float cooldown = 0f;
    public bool allowHold;

    public GameObject shootPoint;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        // if (cooldown > 0) cooldown -= 0.05f;
    }


    public void Shoot()
    {
        // if (!proyectile || cooldown > 0f) { return; }

        // Create a bullet and add force on it in direction of the barrel
        var p = Instantiate(proyectile, barrelLocation.position, barrelLocation.rotation);
            p . GetComponent<Rigidbody>()
              . AddForce(barrelLocation.forward * shotPower);

        Global.CurrentSession.bullets_fired += 1;
        Debug.Log(Global.CurrentLogin);

        // Reset cooldown
        // cooldown += maxCooldown;
        // SetDespawn(p);
    }

    IEnumerator SetDespawn(GameObject p)
    {
        yield return new WaitForSeconds(0.25f);
        Destroy(p.gameObject);
        Destroy(p);
    }
}
