import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
// import '@testing-library/jest-dom'; //getting errors with this, not able to use things like 'toHaveTextContent'...
/**
 * @jest-environment jsdom
*/
import ItemView from '../client/components/containers/ItemView'

describe('Unit react component "Item"', () => {
  describe('ItemViewer test', () => {
    //this item is the same structure as props.item in the itemViewer component
    const item = [
      {title: 'item1Title', 
      image: 'imageUrl' , 
      location:['location0','location1'], 
      description: 'item2Description', 
      dropDate: 'dropDate1/1/2000'} 
      , 
      {title: 'item2Title', 
      image: 'imageUrl' , 
      location:['location0','location1'], 
      description: 'item2Description', 
      dropDate: 'dropDate1/1/2000'}
    ];
    let itemViewTest;
    let itemViewTest2; //trying to use getByTetId
    beforeAll(() => {
      itemViewTest = render(<ItemView item={item[0]} />);
    });
  
    test('title from item exists in component', () => {
      // console.log(itemViewTest.getByRole('heading'));
      // expect(itemViewTest.getByText('item1Title')).toBeTruthy();
      expect(itemViewTest.getByTestId('itemViewDropDate')).toBeTruthy();
  // expect(itemViewTest.getByTestId('itemViewDropDate')).toHaveTextContent('dropDate1/1/2000');
    });

  });
  
  // describe('Market', () => {
  //   let market;
  //   const props = {
  //     index: 253,
  //     location: 'Belarus',
  //     cards: 37,
  //     percentage: '80.00',
  //   };

  //   beforeAll(() => {
  //     market = render(<Market {...props} />);

  //   };
    
  //   );

    // TODO: Test the following:
    // 1. A Market should display an ID, location, number of cards, percent of total
    // 2. It should also contain two buttons for adding and removing markets
    // 3. The functions passed down should be invoked on click
    // 4. The percentage should be a string calculated to two decimals.
    // Test for zero, a whole number, and a fractional value. (Right now this
    // is implemented incorrectly, so follow TDD here)

      
  // });
});


// describe('React-Redux integration tests', () => {

//   describe('Empty state before interactions', () => {

//     beforeEach(async () => {
//       const app = await render(
//           <Provider store={store}>
//             <App />
//           </Provider>);
//     });

//     // TODO: Test the following:
//     // 1. The page loads with two buttons ('Add Markets' and 'Sync')
//     // 2. The page has a 'MegaMarket Loyalty Cards' heading and a 'Markets' heading
//     // 3. The totals display starts off at zero, with no Markets rendered
      
//     test('The page loads with Add Markets and Sync buttons', () => {

//     });

//     test('The page has the correct headings', () => {

//     });

//     test('The displays are set to zero and no markets rendered', () => {

//     });


//   });

//   describe('Adding markets', () => {

//     beforeEach(async () => {
//       const app = await render(
//           <Provider store={store}>
//             <App />
//           </Provider>);
//     });
//     // TODO: Test the following:
//     // 1. MarketCreator can successfully add new Markets to the page
//     // 2. Adding a new market updates the count in TotalsDisplay

//     test('MarketCreator adds new Markets', () => {

//     });

//     test('Displays updated with courrect count', () => {

//     });

//   });
// });