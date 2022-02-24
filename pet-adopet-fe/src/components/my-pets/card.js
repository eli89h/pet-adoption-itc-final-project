import React, { useEffect, useState } from "react";
import { Col, Row, Card, Accordion, Figure, Button } from "react-bootstrap";

import ManageUserPet from "../../pages/pet";

export default function MyCard(props) {
  const pets = props.pets;

  return (
    <div>
      <Row xs={1} md={4} className="g-3">
        {pets &&
          pets.map((pet, idx) => (
            <Col>
              <Card>
                <Figure>
                  <Figure.Image src={pet.pp_pic} width={384} height={384} />
                </Figure>
                <Card.Body>
                  <Card.Title>Name: {pet.name}</Card.Title>
                  <Card.Text>Current Status: {pet.status}</Card.Text>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>See More</Accordion.Header>
                      <Accordion.Body>
                        {console.log(pet.id)}
                        <p>Bio: {pet.bio}</p>
                        <p>
                          Hypoallergenic: {pet.hypoallergenic ? "Yes" : "No"}
                        </p>
                        <p>Height: {pet.height} CM</p>
                        <p>Weight: {pet.weight} or less KG</p>
                        <p>Breed: {pet.breed}</p>
                        <p>Color: {pet.color}</p>
                        <p>Diatery Restrictions: {pet.restrictions}</p>
                        <p>
                          <ManageUserPet pet={pet} />
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}
