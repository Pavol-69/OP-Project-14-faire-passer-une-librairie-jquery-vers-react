function Message({ employee }) {
  return (
    <>
      The employee has been added with the following informations : <br />
      {`- First Name : ${employee.firstName}`} <br />
      {`- last Name : ${employee.lastName}`} <br />
      {`- Start Date : ${employee.startDate}`}
      <br />
      {`- Birth Date : ${employee.birthDate}`}
      <br />
      {`- Street : ${employee.street}`} <br />
      {`- City : ${employee.city}`} <br />
      {`- State : ${employee.state}`} <br />
      {`- Zip Code : ${employee.zipCode}`} <br />
      {`- Department : ${employee.department}`} <br />
    </>
  );
}

export default Message;
