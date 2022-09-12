
import { faker } from '@faker-js/faker';
import model from "./../models";

for(let i=0; i<10; i++){
    const book = model.User({
        name: faker,
        last_name: req.body.last_name,
        roll_number: req.body.roll_number,
        course: req.body.course,
        degree: req.body.degree,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        role: req.body.role,
    })
}
