"use client";

import { useState, useEffect } from 'react';

const getImageUrl = (image: string | null | undefined, fallback: string = "") => {
  if (!image) return fallback;
  if (image.startsWith('/') || image.startsWith('http')) return image;
  return `/api/images/${image}`;
};

export default function AboutAdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [introFile, setIntroFile] = useState<File | null>(null);
  const [ownerFile, setOwnerFile] = useState<File | null>(null);
  const [staffFiles, setStaffFiles] = useState<{ [index: number]: File }>({});

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await fetch('/api/admin/about');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error('Failed to fetch about data', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: uploadData });
    const result = await res.json();
    if (result.success) return result.fileId;
    throw new Error('Upload failed');
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const payload = { ...data };

      if (heroFile) {
        payload.hero.image = await uploadFile(heroFile);
      }
      if (introFile) {
        payload.intro.image = await uploadFile(introFile);
      }
      if (ownerFile) {
        payload.owner.image = await uploadFile(ownerFile);
      }
      for (const [index, file] of Object.entries(staffFiles)) {
        payload.staff[Number(index)].image = await uploadFile(file);
      }

      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage('Successfully saved changes.');
        setHeroFile(null);
        setIntroFile(null);
        setOwnerFile(null);
        setStaffFiles({});
        // Optionally re-fetch to see the updated IDs
        fetchAboutData();
      } else {
        setMessage('Failed to save changes.');
      }
    } catch (error) {
      setMessage('Error occurred while saving. Make sure images are valid.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Failed to load data</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage About Page</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#0c5f50] text-white px-6 py-2 rounded shadow hover:bg-opacity-90 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              rows={2}
              value={data.hero?.title}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              rows={3}
              value={data.hero?.description}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Image</label>
            <input
              type="file"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              onChange={(e) => setHeroFile(e.target.files?.[0] || null)}
            />
            {data.hero?.image && !heroFile && (
               <div className="mt-2">
                 <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={getImageUrl(data.hero.image)} alt="Preview" className="h-32 object-cover rounded shadow-sm border border-gray-200" />
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Intro Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Eyebrow</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              value={data.intro?.eyebrow}
              onChange={(e) => setData({ ...data, intro: { ...data.intro, eyebrow: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              rows={2}
              value={data.intro?.title}
              onChange={(e) => setData({ ...data, intro: { ...data.intro, title: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              rows={5}
              value={data.intro?.description}
              onChange={(e) => setData({ ...data, intro: { ...data.intro, description: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Side Image</label>
            <input
              type="file"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              onChange={(e) => setIntroFile(e.target.files?.[0] || null)}
            />
            {data.intro?.image && !introFile && (
               <div className="mt-2">
                 <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={getImageUrl(data.intro.image)} alt="Preview" className="h-32 object-cover rounded shadow-sm border border-gray-200" />
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Principles Section</h2>
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Eyebrow</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              value={data.principles?.eyebrow}
              onChange={(e) => setData({ ...data, principles: { ...data.principles, eyebrow: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              rows={2}
              value={data.principles?.title}
              onChange={(e) => setData({ ...data, principles: { ...data.principles, title: e.target.value } })}
            />
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 mt-6">Principle Items</h3>
        <div className="grid grid-cols-1 gap-4">
          {data.principles?.items?.map((item: any, index: number) => (
            <div key={index} className="border p-4 rounded bg-gray-50 relative">
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => {
                  const newItems = [...data.principles.items];
                  newItems.splice(index, 1);
                  setData({ ...data, principles: { ...data.principles, items: newItems } });
                }}
              >
                Remove
              </button>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-500">Icon</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded p-1 text-sm"
                    value={item.icon}
                    onChange={(e) => {
                      const newItems = [...data.principles.items];
                      newItems[index].icon = e.target.value;
                      setData({ ...data, principles: { ...data.principles, items: newItems } });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded p-1 text-sm"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...data.principles.items];
                      newItems[index].title = e.target.value;
                      setData({ ...data, principles: { ...data.principles, items: newItems } });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Description</label>
                  <textarea
                    className="mt-1 block w-full border border-gray-300 rounded p-1 text-sm"
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...data.principles.items];
                      newItems[index].description = e.target.value;
                      setData({ ...data, principles: { ...data.principles, items: newItems } });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          onClick={() => {
            const newItems = [...(data.principles?.items || []), { icon: '✦', title: '', description: '' }];
            setData({ ...data, principles: { ...data.principles, items: newItems } });
          }}
        >
          + Add Principle
        </button>
      </section>

      {/* Local Section */}
      <section className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Local Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Eyebrow</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              value={data.local?.eyebrow}
              onChange={(e) => setData({ ...data, local: { ...data.local, eyebrow: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              rows={2}
              value={data.local?.title}
              onChange={(e) => setData({ ...data, local: { ...data.local, title: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              rows={3}
              value={data.local?.description}
              onChange={(e) => setData({ ...data, local: { ...data.local, description: e.target.value } })}
            />
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="bg-white p-6 rounded shadow mb-6 border-l-4 border-[#0c5f50]">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Owner Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              value={data.owner?.name}
              onChange={(e) => setData({ ...data, owner: { ...data.owner, name: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              value={data.owner?.role}
              onChange={(e) => setData({ ...data, owner: { ...data.owner, role: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              rows={3}
              value={data.owner?.bio}
              onChange={(e) => setData({ ...data, owner: { ...data.owner, bio: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              onChange={(e) => setOwnerFile(e.target.files?.[0] || null)}
            />
            {data.owner?.image && !ownerFile && (
               <div className="mt-2">
                 <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={getImageUrl(data.owner.image)} alt="Preview" className="h-32 object-cover rounded shadow-sm border border-gray-200" />
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="bg-white p-6 rounded shadow border-l-4 border-[#0c5f50]">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Staff Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.staff?.map((member: any, index: number) => (
            <div key={index} className="border p-4 rounded bg-gray-50 relative">
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => {
                  const newStaff = [...data.staff];
                  newStaff.splice(index, 1);
                  setData({ ...data, staff: newStaff });
                  const newStaffFiles = { ...staffFiles };
                  delete newStaffFiles[index];
                  setStaffFiles(newStaffFiles);
                }}
              >
                Remove
              </button>
              <div className="space-y-2 mt-4">
                <div>
                  <label className="block text-xs text-gray-500">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded p-1 text-sm"
                    value={member.name}
                    onChange={(e) => {
                      const newStaff = [...data.staff];
                      newStaff[index].name = e.target.value;
                      setData({ ...data, staff: newStaff });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Role</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded p-1 text-sm"
                    value={member.role}
                    onChange={(e) => {
                      const newStaff = [...data.staff];
                      newStaff[index].role = e.target.value;
                      setData({ ...data, staff: newStaff });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Image</label>
                  <input
                    type="file"
                    className="mt-1 block w-full border border-gray-300 rounded p-1 text-sm"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setStaffFiles({ ...staffFiles, [index]: e.target.files[0] });
                      }
                    }}
                  />
                  {member.image && !staffFiles[index] && (
                     <div className="mt-2">
                       <p className="text-[10px] text-gray-500 mb-1">Current Image:</p>
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={getImageUrl(member.image)} alt="Preview" className="h-16 w-16 object-cover rounded shadow-sm border border-gray-200" />
                     </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          onClick={() => {
            const newStaff = [...(data.staff || []), { name: '', role: '', image: '' }];
            setData({ ...data, staff: newStaff });
          }}
        >
          + Add Staff Member
        </button>
      </section>

    </div>
  );
}
