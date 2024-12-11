import { Card, CardContent } from "@/components/ui/card";
import { ProfileForm } from "./form";

function Page() {
  return (
    <div>
      <Card>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
export default Page;
