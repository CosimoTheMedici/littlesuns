import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function AccordionCard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card>
      <Accordion.Toggle
       
        onClick={toggleAccordion}
      >
        Accordion Item 1
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" in={isOpen}>
        <Card.Body>
          Cheesecake muffin cupcake dragée lemon drops tiramisu cake gummies chocolate cake. Marshmallow tart croissant. Tart dessert tiramisu marzipan lollipop lemon drops.
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default AccordionCard;
