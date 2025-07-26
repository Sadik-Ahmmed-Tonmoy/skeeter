"use client";

const Example = () => {
  return (
    <div>
      <h1>Example Component</h1>
      <p>This is an example component to demonstrate the structure.</p>
      <p>You can replace this with your actual content.</p>
    </div>
  );
};

export default Example;

// Example Usage
// const ExampleMenu: React.FC = () => {
//   const menuItems: MenuItemProps[] = [
//     {
//       key: '1',
//       label: 'Navigation One',
//       icon: <span>📌</span>,
//       children: [
//         {
//           key: '1-1',
//           label: 'Option 1',
//         },
//         {
//           key: '1-2',
//           label: 'Option 2',
//           children: [
//             {
//               key: '1-2-1',
//               label: 'Suboption 1',
//             },
//             {
//               key: '1-2-2',
//               label: 'Suboption 2',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       key: '2',
//       label: 'Navigation Two',
//       icon: <span>📊</span>,
//       children: [
//         {
//           key: '2-1',
//           label: 'Option 1',
//         },
//         {
//           key: '2-2',
//           label: 'Option 2',
//         },
//       ],
//     },
//     {
//       key: '3',
//       label: 'Navigation Three',
//       icon: <span>⚙️</span>,
//       disabled: true,
//     },
//     {
//       key: '4',
//       label: 'Navigation Four',
//       icon: <span>📝</span>,
//       children: [
//         {
//           key: '4-1',
//           label: 'Option 1',
//         },
//         {
//           key: '4-2',
//           label: 'Option 2',
//           children: [
//             {
//               key: '4-2-1',
//               label: 'Suboption 1',
//             },
//             {
//               key: '4-2-2',
//               label: 'Suboption 2',
//               children: [
//                 {
//                   key: '4-2-2-1',
//                   label: 'Deep option',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ];

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//       <h2>Vertical Menu (Light)</h2>
//       <Menu
//         items={menuItems}
//         defaultSelectedKeys={['1-1']}
//         defaultOpenKeys={['1']}
//         onSelect={(key) => console.log('Selected:', key)}
//       />

//       <h2>Vertical Menu (Dark)</h2>
//       <Menu
//         items={menuItems}
//         theme="dark"
//         defaultSelectedKeys={['2-1']}
//         defaultOpenKeys={['2']}
//         onSelect={(key) => console.log('Selected:', key)}
//       />

//       <h2>Horizontal Menu</h2>
//       <Menu
//         items={menuItems}
//         mode="horizontal"
//         defaultSelectedKeys={['4-1']}
//         onSelect={(key) => console.log('Selected:', key)}
//       />
//     </div>
//   );
// };
