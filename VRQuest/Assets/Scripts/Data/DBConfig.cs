using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class DBConfig 
{
    public const string ROUTE = "http://localhost";
    public const string PORT  = "4000";

    public static string Route()
    {
        return ROUTE + ":" + PORT;
    }
}