import React from "react";

export interface UserI {
    _id: string;
    username: string;
}

export interface ListI {
    _id: string;
    owner_id: string;
    name: string;
}