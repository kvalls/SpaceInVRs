using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class AuthController : MonoBehaviour
{
    private const string ENDPOINT = "/api/users/signin";
    public static string route = DBConfig.Route() + ENDPOINT;

    private static string ToAuthString(string username, string password)
    {
        string auth = username + ":" + password;
        auth = System.Convert.ToBase64String(System.Text.Encoding.GetEncoding("ISO-8859-1").GetBytes(auth));
        auth = "Basic " + auth;
        return auth;
    }
    
    public static IEnumerator Signin(User user)
    {
        // string json = JsonUtility.ToJson(user);
        // Debug.Log(json);
        string json = "";
        

        using (var webRequest = UnityWebRequest.Put(route, json))
        {
            webRequest.method = "POST";
            // webRequest.SetRequestHeader("Content-Type", "application/json");
            webRequest.SetRequestHeader("AUTHORIZATION", ToAuthString(user.name, user.password));
            yield return webRequest.SendWebRequest();
        
            Debug.Log("UWR (User Login) result: " + webRequest.result);
            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.Log(webRequest.error);
                yield break;
            }
        
            string jsonResult = webRequest.downloadHandler.text;
            Debug.Log(jsonResult);
            
            var error = JsonUtility.FromJson<ErrorData>(jsonResult);
            if (error.code != null) {
                // TODO: Add a way to notify the failure to the user.
                yield break;
            }

            Global.CurrentLogin = JsonUtility.FromJson<Login>(jsonResult);
        }
    }
}
