using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// This class exists with the sole purpose of providing constructors for
/// the data models.
/// 
/// The JSON Utility won't work with classes that have anything other than
/// properties.
/// </summary>
public static class Constructors
{
    public static User NewUser(
        int id,
        int role_id,
        string password, 
        string name,
        string email
    ) {
        var user = new User();
        user.id         = id;
        user.role_id    = role_id;
        user.password   = password;
        user.name       = name;
        user.email      = email;
        
        return user;
    }

    public static User NewUserLogin(
        string name,
        string password
    ) {
        var user = new User();
        user.name     = name;
        user.password = password;
    
        return user;
    }

    public static Session NewSession(
        int id,
        int user_id,
        int score,
        int ships_destroyed,
        int bullets_fired,
        int powerups
    ) {
        var session = new Session();
        session.id              = id;
        session.user_id         = user_id;
        session.score           = score;
        session.ships_destroyed = ships_destroyed;
        session.bullets_fired   = bullets_fired;
        session.powerups        = powerups;
    
        return session;
    }
}
