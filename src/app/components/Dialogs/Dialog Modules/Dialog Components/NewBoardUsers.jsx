import Crown from "@/app/components/Utility/Crown"
import InviteUserButton from "@/app/components/Buttons/InviteUserButton"
import { Label } from "@/app/components/ui/label"
import { UserMinus } from "lucide-react"

export default function NewBoardUsers({ user, invitedUsers }) {
    return (
        <div className={`min-w-40 `}>
            <Label htmlFor="users" className={`text-purple-200`}>
                Board Users
            </Label>
            <div className={`py-4`}>
                <div
                    className={`flex text-base items-center justify-start gap-4`}
                    id="users"
                >
                    <p className={`text-white text-base`}>{user.name}</p>
                    <Crown />
                </div>
                {invitedUsers.map((user) => {
                    return (
                        <div
                            key={user.id}
                            className={`flex text-base items-center justify-start gap-4`}
                        >
                            <p className={`text-white text-base`}>
                                {user.name}
                            </p>
                            <UserMinus color="#ffffff" />{" "}
                        </div>
                    )
                })}
            </div>
            <InviteUserButton />
        </div>
    )
}
