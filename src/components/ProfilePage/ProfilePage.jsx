import styles from './ProfilePage.module.scss';

function ProfilePage({ profiles, activeProfile, onSelectProfile }) {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Profiles</h2>
      <div className={styles.profiles}>
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`${styles.profile} ${activeProfile.id === profile.id ? styles.active : ''}`}
            onClick={() => onSelectProfile(profile)}
          >
            <span className={styles.profileLabel}>{profile.label}</span>
            {activeProfile.id === profile.id && (
              <span className={styles.activeBadge}>Active</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
