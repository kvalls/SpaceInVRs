using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System.Text;
public static class RecordController
{
    private const string ENDPOINT = "/api/records";
    
    public static string route = DBConfig.Route() + ENDPOINT;
    
    /// <summary>
    /// I was trying to use this with UnityWebRequest.Post but it just doesn't work.
    /// Found this:
    ///     https://stackoverflow.com/questions/68156230/unitywebrequest-post-not-sending-body
    /// 
    /// "So I had seen this solution elsewhere, but I continued ignoring it because it's hacky af and seems like something that should be addressed. However, I'm at the point of not caring right now.
    ///     - Use UnityWebRequest.Put instead of UnityWebRequest.Post
    ///     - Set webRequest.method = "POST";
    ///     - Set webRequest.SetRequestHeader("Content-Type", "application/json");
    /// 
    /// This works, but feels really bad and doesn't make any sense." 
    /// </summary>
    /// <param name="session"></param>
    /// <returns></returns>
    public static IEnumerator Create(Session session) 
    {
        string json = JsonUtility.ToJson(session);
        using (var webRequest = UnityWebRequest.Put(route + "/create", json))
        {
            webRequest.method = "POST";
            webRequest.SetRequestHeader("Content-Type", "application/json");
            
            // Wait until it is done
            yield return webRequest.SendWebRequest();

            Debug.Log("UWR (Record Post) result: " + webRequest.result);
            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.Log(webRequest.error);
            }
            else
            {
                Debug.Log("Form upload complete!");
            }
        }
    }
}
