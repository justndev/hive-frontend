export function timeAgo(date: string): string {
    const dateObject = new Date(date);
    const seconds = Math.floor((new Date().getTime() - dateObject.getTime()) / 1000);
    const interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    if (interval === 1) {
        return interval + " year ago";
    }

    const months = Math.floor(seconds / 2628000);
    if (months > 1) {
        return months + " months ago";
    }
    if (months === 1) {
        return months + " month ago";
    }

    const days = Math.floor(seconds / 86400);
    if (days > 1) {
        return days + " days ago";
    }
    if (days === 1) {
        return days + " day ago";
    }

    const hours = Math.floor(seconds / 3600);
    if (hours > 1) {
        return hours + " hours ago";
    }
    if (hours === 1) {
        return hours + " hour ago";
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes > 1) {
        return minutes + " minutes ago";
    }
    if (minutes === 1) {
        return minutes + " minute ago";
    }

    return "just now";
}

export function dayAgo(date: string): string {
    const dateObject = new Date(date);
    const seconds = Math.floor((new Date().getTime() - dateObject.getTime()) / 1000);
    const interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    if (interval === 1) {
        return interval + " year ago";
    }

    const months = Math.floor(seconds / 2628000);
    if (months > 1) {
        return months + " months ago";
    }
    if (months === 1) {
        return months + " month ago";
    }

    const days = Math.floor(seconds / 86400);
    if (days > 1) {
        return days + " days ago";
    }
    if (days === 1) {
        return days + " day ago";
    }

    const hours = Math.floor(seconds / 3600);
    if (hours > 1) {
        return hours + " hours ago";
    }
    if (hours === 1) {
        return hours + " hour ago";
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes > 1) {
        return minutes + " minutes ago";
    }
    if (minutes === 1) {
        return minutes + " minute ago";
    }

    return "just now";
}

export function getTimeDescription(date: string): string {
    const dateObject = new Date(date);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - dateObject.getTime()) / 1000);

    // Define time intervals in seconds
    const oneMinute = 60;
    const oneHour = 3600;
    const oneDay = 86400;
    const oneWeek = 604800;
    const oneMonth = 2628000; // Approximately
    const oneYear = 31536000; // Approximately

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Check for different time intervals
    if (seconds < oneDay) {
        const hours = Math.floor(seconds / oneHour);
        const minutes = Math.floor(seconds / oneMinute);

        if (hours > 0 || minutes > 0) {
            const hoursStr = dateObject.getHours().toString().padStart(2, '0');
            const minutesStr = dateObject.getMinutes().toString().padStart(2, '0');
            return `${hoursStr}:${minutesStr}`;
        }
        return "just now";
    }

    const days = Math.floor(seconds / oneDay);
    if (days === 1) {
        return "yesterday";
    }
    if (days < 7) {
        const messageDay = dateObject.getDay();
        const today = now.getDay();

        // Calculate the correct day name
        let dayName = daysOfWeek[messageDay];
        if (messageDay <= today) {
            dayName = daysOfWeek[(messageDay + 7) % 7];
        }
        return dayName;
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    const months = Math.floor(days / 30); // Rough approximation
    if (months < 12) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }

    const years = Math.floor(days / 365); // Rough approximation
    return `${years} year${years > 1 ? 's' : ''} ago`;
}


