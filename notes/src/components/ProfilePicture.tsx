import Avatar from 'react-avatar';

interface ProfilePictureProps {
    name: string;
    handleProfileClick: () => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ name, handleProfileClick }) => {
    const initials = name ? name.split(' ').map(part => part[0]).join('') : '';

    return (
        <Avatar
            name={initials}
            size="36"
            color='orange'
            className="ml-2"
            onClick={handleProfileClick}
        />
    );
};

export default ProfilePicture;
