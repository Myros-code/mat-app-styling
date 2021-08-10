import AlertDialog from "../AlertDialog/AlertDialog";
import React, { useEffect, useState } from "react";

const ClearStorageAlertDialog = (props) => {
  const appId = "mc7n743";
  const lastAppId = JSON.parse(localStorage.getItem("appId"));
  const [resetStoreDialogOpen, setResetStoreDialogOpen] = useState(false);

  const [currAppId, setCurrAppId] = useState(lastAppId);
  const isAppIdEqual = currAppId === appId;

  const openDialog = () => {
    setResetStoreDialogOpen(true);
  };

  const closeDialog = () => {
    setResetStoreDialogOpen(false);
    localStorage.setItem("appId", JSON.stringify(appId));
  };

  const onSubmit = () => {
    localStorage.removeItem("reduxState");
    window.location.reload();
  };

  const handleSubmit = () => {
    onSubmit();
    closeDialog();
  };

  useEffect(() => {
    if (!isAppIdEqual) {
      openDialog();
    }
  }, [isAppIdEqual]);

  const dialogTitle = "App updated, clear cache?";
  const dialogDesc =
    "The application may not work correctly if you do not clear the cache";

  return (
    <AlertDialog
      {...props}
      dialogDesc={dialogDesc}
      dialogTitle={dialogTitle}
      open={resetStoreDialogOpen}
      onSubmit={onSubmit}
      setOpen={setResetStoreDialogOpen}
      handleClose={closeDialog}
      handleSubmit={handleSubmit}
    />
  );
};

export default ClearStorageAlertDialog;
