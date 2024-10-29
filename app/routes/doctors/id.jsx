// app/routes/doctors/$id.jsx
import React,{useState ,useCallback } from 'react';
import { useParams } from '@remix-run/react';
import { Page, Card, IndexTable, Badge,Tabs,LegacyCard  , TextContainer } from '@shopify/polaris';

const DoctorDetail = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => setSelectedTab(selectedTabIndex), []);


  // Replace with a dynamic data fetching logic based on ID
  const doctor = {
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    phone: '(555) 123-4567',
    email: 'john.doe@example.com',
  };

  const patients = [
    { id: '2010', name: 'Alice Smith', age: '29', phone: '(555) 234-5678', email: 'alice.smith@example.com', status: <Badge tone="success">Active</Badge> },
  ];

  const tabs = [
    {
      id: 'details-tab',
      content: 'Details',
      panelID: 'details-content',
    },
    {
      id: 'patients-tab',
      content: 'Patient Listing',
      panelID: 'patients-content',
    },
  ];

  const patientRowMarkup = patients.map(({ id, name, age, phone, email, status }, index) => (
    <IndexTable.Row id={id} key={id} position={index}>
      <IndexTable.Cell>{name}</IndexTable.Cell>
      <IndexTable.Cell>{age}</IndexTable.Cell>
      <IndexTable.Cell>{phone}</IndexTable.Cell>
      <IndexTable.Cell>{email}</IndexTable.Cell>
      <IndexTable.Cell>{status}</IndexTable.Cell>
    </IndexTable.Row>
  ));
  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <Card>
          <h3>{doctor.name}</h3>
          <p>Specialty: {doctor.specialty}</p>
          <p>Phone: {doctor.phone}</p>
          <p>Email: {doctor.email}</p>
        </Card>
        );
      case 1:
        return (
          <Card title="Patients" sectioned>
          <IndexTable
            resourceName={{ singular: 'patient', plural: 'patients' }}
            itemCount={patients.length}
            headings={[
              { title: 'Patient' },
              { title: 'Age' },
              { title: 'Phone' },
              { title: 'Email' },
              { title: 'Status' },
            ]}
          >
            {patientRowMarkup}
          </IndexTable>
        </Card>
        );
      default:
        return null;
    }
  };

  return (


<Page title="Doctor Details">
<Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
  <LegacyCard>{renderTabContent()}</LegacyCard>
</Tabs>
</Page>
  );
};

export default DoctorDetail;
