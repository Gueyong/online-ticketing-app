'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import TicketItem from "@/components/tickets/TicketItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(categories => {
        console.log('Fetched categories:', categories);
        setCategories(categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    fetch('/api/ticket-items')
      .then(res => res.json())
      .then(menuItems => {
        console.log('Fetched ticket items:', menuItems);
        setMenuItems(menuItems);
      })
      .catch(error => {
        console.error('Error fetching ticket items:', error);
      });
  }, []); 
 
  return (
    <section className="mt-8">
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {Array.isArray(menuItems) && menuItems.filter(item => item.category === c._id).map(item => (
              <TicketItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
