// import { cn } from "@repo/lib";
// import { TabItem, Tabs } from "@repo/ui/tabs";

// export const TabManue = ({
//   variant="default",
//   config,
//   parentClass,
//   // iconColor,
// }: {
//   variant?: keyof TabStyles ;
//   config: any[];
//   parentClass: string;
//   // iconColor?: string;
// }) => {
//   return (
//     <div className={cn("", parentClass)}>
//       <Tabs variant={variant} className=" w-full" >
//         {config.map((element, idx) => {
//           return element.isDisable ? (
//             <TabItem
//               disabled
//               key={idx}
//               title={element.title}
//               icon={element.icon}
              
//             >
//               {element.title}
//             </TabItem>
//           ) : (
//             <TabItem
//               key={idx}
//               active
//               title={element.title}
//               icon={element?.icon}
//             >
//               {/* <element.component/> */}
//               {element.component}
//             </TabItem>
//           );
//         })}
//       </Tabs>
//     </div>
//   );
// };

// export default TabManue;
