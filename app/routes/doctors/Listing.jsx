// app/routes/doctors/index.jsx
import React from 'react';
import {
  IndexTable,
  Card,
  useIndexResourceState,
  Text,
  Badge,
  Page,
  Button,
} from '@shopify/polaris';
import { Link } from '@remix-run/react';

const DoctorListing = () => {
  const doctors = [
    { id: '1001', name: 'Dr. John Doe', specialty: 'Cardiology', phone: '(555) 123-4567', email: 'john.doe@example.com', status: <Badge tone="success">Active</Badge> },
    { id: '1002', name: 'Dr. Jane Smith', specialty: 'Dermatology', phone: '(555) 234-5678', email: 'jane.smith@example.com', status: <Badge tone="warning">On Leave</Badge> },
    // Add more doctors as needed...
  ];

  const resourceName = { singular: 'doctor', plural: 'doctors' };
  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(doctors);

  const rowMarkup = doctors.map(({ id, name, specialty, phone, email, status }, index) => (
    <IndexTable.Row id={id} key={id} selected={selectedResources.includes(id)} position={index}>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">{name}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{specialty}</IndexTable.Cell>
      <IndexTable.Cell>{phone}</IndexTable.Cell>
      <IndexTable.Cell>{email}</IndexTable.Cell>
      <IndexTable.Cell>{status}</IndexTable.Cell>
      <IndexTable.Cell>
        <Link to={`/doctors/${id}`}>
          <Button>View</Button>
        </Link>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page title="Doctor Listings">
      <Card title="Doctors" sectioned>
        <IndexTable
          resourceName={resourceName}
          itemCount={doctors.length}
          selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: 'Doctor' },
            { title: 'Specialty' },
            { title: 'Phone' },
            { title: 'Email' },
            { title: 'Status' },
            { title: 'Actions' },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </Page>
  );
};

export default DoctorListing;
