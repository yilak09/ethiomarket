var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var dbt = mongojs('mongodb://localhost:27017/nodeauth', ['tasks']);
var dbu = mongojs('mongodb://localhost:27017/nodeauth', ['users']);

router.get('/tasks', (req, res, next) => {
    dbt.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err);
        } else {
            res.json(tasks)
        }
    })
})

// users
router.get('/users', (req, res, next) => {
    dbu.users.find(function (err, users) {
        if (err) {
            res.send(err);
        } else {
            res.json(users)
        }
    })
})

//get Single Tasks
router.get('/task/:id', (req, res, next) => {
    dbt.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json(task)
        }
    })
})

router.get('/user/:username', (req, res, next) => {
    dbu.users.find({username: req.params.username}, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user)
        }
    })
})
// Save Task

router.post('/tasks', (req, res, next) => {
    var task = req.body;
    console.log({
        "user": task.user,
        "title": task.title,
        "isDone": task.isDone,
    });
    if (task.user === undefined || task.title === undefined || task.isDone) {
        res.json({
            "error": "Bad Data"
        })
    } else {
        dbt.tasks.save(task, (err, task) => {
            if (err) {
                res.send(err);
            }
            res.send(task);
        });
    }
})
// delete task
router.delete('/task/:id', (req, res, next) => {
    dbt.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.status(400)
            res.send(err);
        } else {
            res.json(task)
        }
    })
})

router.put('/task', (req, res, next) => {
    var task = req.body;
    var updTask = {};
    if(updTask.isDone){
        updTask.isDone=task.isDone;
    }
    if (task.isDone) {
        updTask.isDone = task.isDone;
    }
    if (task.title) {
        updTask.title = task.title;
    }
    if (!updTask) {
        res.status(400);
        res.json(
            {
                "error": "Bad Data"
            }
        )
    } else {
        dbt.tasks.update({_id : mongojs.ObjectId(req.params.id)},
        updTask,{$set:{updTask}}, function (err, task) {
            if (err) {
                res.send(err);
            } else {
                res.json(task)
            }
        })
    }
})
module.exports = router;