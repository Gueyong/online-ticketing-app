'use client';
import DeleteButton from "@/components/DeleteButton";
import Left from "@/components/icons/Left";
import EventForm from "@/components/layout/EventForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditEventPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [redirectToEvents, setRedirectToEvents] = useState(false);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/events/'+id).then(res => {
      res.json().then(event => {
        setEvent(event);
      });
    })
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = {...data, _id:id};
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/events', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving this event',
      success: 'Saved',
      error: 'Error',
    });

    setRedirectToEvents(true);
  }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/events?_id='+id, {
        method: 'DELETE',
      });
      if (res.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    setRedirectToEvents(true);
  }

  if (redirectToEvents) {
    return redirect('/events');
  }

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin.';
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/events'} className="button">
          <Left />
          <span>Show all events</span>
        </Link>
      </div>
      <EventForm event={event} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label="Delete this event"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}