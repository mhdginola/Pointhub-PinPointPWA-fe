describe('Camera Test', () => {
  it('print', () => {
    cy.visit('/template')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000)
    // cy.window().then((doc) => {
    //   doc.print();
    // });
    // Hide other elements on the page
    cy.get('#elementToPrint').then((element) => {
    element.css('display', 'block');
    element.siblings().css('display', 'none');
    });

    // Trigger the print functionality
    cy.window().then((win) => {
    win.print();
    });

    // Restore the original state of the page
    cy.get('#elementToPrint').then((element) => {
    element.css('display', 'none');
    element.siblings().css('display', 'block');
    });

  })
  // it('download',()=>{
  //   cy.intercept('GET', '/api/v1/report', (req) => {
  //     req.reply({
  //       statusCode: 200,
  //       body: 'Mocked file content', // Replace with the desired file content
  //       headers: {
  //         'Content-Type': 'application/octet-stream', // Set the appropriate content type for the file
  //         'Content-Disposition': 'attachment; filename="mocked-file.xlsx"', // Replace with the desired filename and extension
  //       },
  //     });
  //   }).as('getData');

  //   // Perform actions that trigger the file download, e.g., clicking a download button or making an API request

  //   cy.wait('@getData'); // Wait for the download to complete (adjust the wait time as needed)

  //   // Assert that the file was downloaded successfully
  //   cy.readFile('downloads/mocked-file.xlsx', 'binary').should('exist');
  // })
  // it('show page purchase report, with filter', () => {
  //   cy.visit('/template')
  //   const dateFrom = '2022-01-01'
  //   const dateTo = '2023-01-01'
  //   const supplier = 'PT ABC'
  //   cy.intercept('GET', `/api/v1/report`, {
  //     status: 200,
  //     body: [
  //       { id: 1, dateInvoice: '2023-01-01' },
  //       { id: 2, dateInvoice: '2022-01-01' },
  //       { id: 2, dateInvoice: '2022-06-01' },
  //     ]
  //   }).as('getData');
  //   cy.get('input[name="dateFrom"]').type(dateFrom)
  //   cy.get('input[name="dateTo"]').type(dateTo)
  //   cy.get('select[name="supplier"]').select(supplier)
  //   cy.get('button#filter').click()
  //   cy.wait('@getData')
  //   cy.get('td#dateInvoice').each(($td) => {
  //     expect(new Date($td.text())).to.be.gte(new Date(dateFrom));
  //     expect(new Date($td.text())).to.be.lte(new Date(dateTo));
  //   })
  // })
  // it('should access the camera', () => {
  //   cy.visit('/template'); // Replace with the URL of the page where you want to access the camera

  //   cy.window().then((win: any) => {
  //     return win.navigator.mediaDevices.getUserMedia({ video: true });
  //   })
  //   .then((stream: MediaStream) => {
  //     const video = document.createElement('video');
  //     video.srcObject = stream;
  //     video.play();

  //     // You can perform additional assertions or actions with the video stream as needed
  //   });
  // });
  // it('should access the user location', () => {
  //   cy.visit('/template'); // Replace with the URL where you want to access the location

  //   cy.window().then((win: Window) => {
  //     cy.stub(win.navigator.geolocation, 'getCurrentPosition')
  //       .callsFake((callback) => {
  //         const position = {
  //           coords: {
  //             latitude: 51.5074, // Replace with the desired latitude
  //             longitude: -0.1278, // Replace with the desired longitude
  //           },
  //         };
  //         callback(position);
  //       });
  //   });

  //   // Continue with your test assertions or actions
  // });
  // it('should handle location access failure', () => {
  //   cy.visit('/template'); // Replace with the URL where you want to access the location

  //   cy.window().then((win: Window) => {
  //     cy.stub(win.navigator.geolocation, 'getCurrentPosition')
  //       .callsFake((successCallback, errorCallback) => {
  //         const error = new Error('Failed to retrieve location');
  //         const positionError = {
  //           code: 2, // POSITION_UNAVAILABLE
  //           message: error.message,
  //         };
  //         errorCallback(positionError);
  //       });
  //   });

  //   // Continue with your test assertions or actions for failure case
  // })
  // it('show page purchase report, with search', () => {
  //   cy.visit('/template');
  //   const supplierSearch = 'supplier test';
  //   cy.intercept('GET', `/api/v1/report?search=${supplierSearch}`, {
  //     status: 200,
  //     body: [
  //       { id: 1, supplier: supplierSearch },
  //       { id: 2, supplier: supplierSearch },
  //     ]
  //   }).as('getData');
    
  //   cy.get('input[name="search"]').type(supplierSearch)
  //   cy.get('button#search').click()
  //   // cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users').as('getData')
  //   // cy.request(`/main`).then(req=>{
  //   //   console.log(req)
  //   // })
  //   cy.wait('@getData')
  //   cy.get('td#dataSupplier').each(($td) => {
  //     expect($td.text()).to.contain(supplierSearch);
  //   })
  //   // .then(() => {
  //   //   cy.get('th#dataSupplier').invoke('text').each((row)=>{
  //   //     expect(row).to.equal(supplierSearch);
  //   //   })
  //   // });

  // });
  // describe('Google API Login', () => {
  //   it('should log in using Google API', () => {
  //     cy.request({
  //       method: 'POST',
  //       url: 'https://accounts.google.com/o/oauth2/token',
  //       form: true,
  //       body: {
  //         grant_type: 'password',
  //         username: 'YOUR_USERNAME',
  //         password: 'YOUR_PASSWORD',
  //         client_id: 'YOUR_CLIENT_ID',
  //         client_secret: 'YOUR_CLIENT_SECRET',
  //       },
  //     }).then((response) => {
  //       // Assert on the response or perform further actions
  //       expect(response.status).to.equal(200);
  //       // ... perform more assertions or actions
  //     });
  //   });
  // });
  
});
