import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import styles from './ProfilePage.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function ProfilePage({
  profiles,
  activeProfile,
  onSelectProfile,
  onCreateProfile,
  onDeleteProfile,
  onEditProfile,
  onAddCategory,
  onUpdateCategory,
  onAddTask,
  onUpdateTask,
  onSaveProfile,
}) {
  const [newProfileName, setNewProfileName] = useState('');

  const handleCreate = () => {
    if (!newProfileName.trim()) return;
    onCreateProfile(newProfileName.trim());
    setNewProfileName('');
  };

  const [editingProfileId, setEditingProfileId] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);

  const handleEditClick = (e, profile) => {
    e.stopPropagation();
    onEditProfile(profile);
    if (editingProfileId === profile.id) {
      setEditingProfileId(null);
      setEditingProfile(null);
    } else {
      setEditingProfileId(profile.id);
      setEditingProfile(JSON.parse(JSON.stringify(profile))); // deep copy
    }
  };

  const handleLocalUpdateCategory = (categoryIndex, updatedCategory) => {
    setEditingProfile((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) =>
        i === categoryIndex ? updatedCategory : c,
      ),
    }));
  };

  const handleLocalAddCategory = () => {
    setEditingProfile((prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        {
          id: crypto.randomUUID(),
          label: 'New Category',
          rewards: ['coin'],
          pickCount: 1,
          dailyTasks: [],
          poolTasks: [],
        },
      ],
    }));
  };

  const handleLocalAddTask = (categoryIndex) => {
    setEditingProfile((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) => {
        if (i !== categoryIndex) return c;
        return {
          ...c,
          dailyTasks: [...c.dailyTasks, { label: 'New Task', emoji: '⭐' }],
        };
      }),
    }));
  };

  const handleLocalUpdateTask = (categoryIndex, taskIndex, updatedTask) => {
    setEditingProfile((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) => {
        if (i !== categoryIndex) return c;
        return {
          ...c,
          dailyTasks: c.dailyTasks.map((t, j) =>
            j === taskIndex ? updatedTask : t,
          ),
        };
      }),
    }));
  };

  const handleLocalDeleteCategory = (categoryIndex) => {
    setEditingProfile((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== categoryIndex),
    }));
  };

  const handleLocalDeleteTask = (categoryIndex, taskIndex) => {
    setEditingProfile((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) => {
        if (i !== categoryIndex) return c;
        return {
          ...c,
          dailyTasks: c.dailyTasks.filter((_, j) => j !== taskIndex),
        };
      }),
    }));
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Profiles</h2>
      <div className={styles.profiles}>
        {profiles.map((profile) => (
          <div key={profile.id} className={styles.profileWrapper}>
            <div
              className={`${styles.profile} ${activeProfile.id === profile.id ? styles.active : ''}`}
              onClick={() => onSelectProfile(profile)}
            >
              <div className={styles.profileTop}>
                <span className={styles.profileLabel}>{profile.label}</span>
                <div className={styles.profileActions}>
                  {activeProfile.id === profile.id && (
                    <>
                      <span className={styles.activeBadge}>Active</span>
                      {profile.editable && (
                        <button
                          className={styles.editButton}
                          onClick={(e) => handleEditClick(e, profile)}
                        >
                          <EditIcon fontSize='small' />
                        </button>
                      )}
                    </>
                  )}
                  {profile.editable && (
                    <button
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProfile(profile);
                      }}
                    >
                      <DeleteIcon fontSize='small' />
                    </button>
                  )}
                </div>
              </div>
              {editingProfileId === profile.id && editingProfile && (
                <div
                  className={styles.editor}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.editorHeader}>
                    <span className={styles.editorTitle}>Categories</span>
                    <button
                      className={styles.addButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLocalAddCategory();
                      }}
                    >
                      <AddIcon fontSize='small' /> Add Category
                    </button>
                  </div>
                  {editingProfile.categories.map((category, categoryIndex) => (
                    <div key={category.id} className={styles.categoryEditor}>
                      <div className={styles.categoryHeader}>
                        <input
                          className={styles.input}
                          value={category.label}
                          onChange={(e) =>
                            handleLocalUpdateCategory(categoryIndex, {
                              ...category,
                              label: e.target.value,
                            })
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          className={styles.addButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLocalAddTask(categoryIndex);
                          }}
                        >
                          <AddIcon fontSize='small' />
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLocalDeleteCategory(categoryIndex);
                          }}
                        >
                          <DeleteIcon fontSize='small' />
                        </button>
                      </div>
                      {category.dailyTasks.map((task, taskIndex) => (
                        <div key={taskIndex} className={styles.taskEditor}>
                          <input
                            className={styles.input}
                            value={task.emoji}
                            onChange={(e) =>
                              handleLocalUpdateTask(categoryIndex, taskIndex, {
                                ...task,
                                emoji: e.target.value,
                              })
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                          <input
                            className={styles.input}
                            value={task.label}
                            onChange={(e) =>
                              handleLocalUpdateTask(categoryIndex, taskIndex, {
                                ...task,
                                label: e.target.value,
                              })
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            className={styles.deleteButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLocalDeleteTask(categoryIndex, taskIndex);
                            }}
                          >
                            <DeleteIcon fontSize='small' />
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button
                    className={styles.saveButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveProfile(editingProfile);
                      setEditingProfileId(null);
                      setEditingProfile(null);
                    }}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.createProfile}>
        <input
          className={styles.input}
          type='text'
          placeholder='New profile name...'
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
        />
        <button className={styles.createButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
