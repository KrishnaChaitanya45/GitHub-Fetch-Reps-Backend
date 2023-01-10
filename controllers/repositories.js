const express = require('express');
const axios = require('axios');
const getUsername = async(req,res)=>{
    try {
        const {username} = req.params;
        const githubUserName = username.toLowerCase();
        const response = await axios.get(`https://api.github.com/users/${githubUserName}`);
        const user = await response.data;
        res.cookie('UserId',githubUserName);
        return res.status(201).json({msg:"User Found..!",user:user});
    } catch (error) {
        return res.status(404).json({msg:"No User Found.!"});
    }
   
}
const getUserRepositories = async(req,res)=>{
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const start = (page-1) * limit;
        const end = page*limit;
        const results = {};
        const username = req.cookies.UserId;
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        const repos = await response.data;
        if(end < repos.length){
            results.next = {
                page:page+1,
                limit:limit
            }
        }
        if(start > 0){
            results.prev = {
                page:page-1,
                limit:limit
            }
        }
        
        results.result = repos.slice(start,end);
        return res.status(200).json({msg:"Fetched Successfully",repos:results});
    } catch (error) {
        return res.status(404).json({msg:"Failed to fetch"});
        
    }
}
module.exports = {
    getUsername,getUserRepositories
}