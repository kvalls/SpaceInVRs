using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Session
{
    public int id              { get; set; }
    public int user_id         { get; set; }
    public int score           { get; set; }
    public int ships_destroyed { get; set; }
    public int bullets_fired   { get; set; }
    public int powerups        { get; set; }
}