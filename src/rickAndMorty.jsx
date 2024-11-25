import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import "./RickAndMorty.css"; 

const RickAndMorty = () => {
  const [dataType, setDataType] = useState("character"); 
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://rickandmortyapi.com/api/${dataType}`;
      try {
        const response = await axios.get(apiUrl);
        setItems(response.data.results.map((item) => ({ id: item.id, name: item.name })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataType]);

  return (
    <Container className="p-4">
      <h1 className="text-primary mb-4">Rick and Morty API</h1>
      <Form.Group controlId="dataType" className="mb-3">
        <Form.Label>Select Data Type:</Form.Label>
        <Form.Select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="character">Characters</option>
          <option value="episode">Episodes</option>
          <option value="location">Locations</option>
        </Form.Select>
      </Form.Group>

      <Row>
        {items.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} className="mb-4">
            <ListGroup>
              <ListGroup.Item className="p-3 text-center border-primary">
                <strong>ID:</strong> {item.id} <br />
                <strong>Name:</strong> {item.name}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RickAndMorty;
