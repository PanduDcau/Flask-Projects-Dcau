# import cvzone
# import cv2
#
# cap = cv2.VideoCapture(0)
# cap.set(3, 1280)
# cap.set(4, 720)
#
# while True:
#     success, img = cap.read()
#     imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#     imgList = [img, img, imgGray, img, imgGray, img,imgGray, img, img]
#     stackedImg = cvzone.stackImages(imgList, 3, 0.4)
#
#     cv2.imshow("stackedImg", stackedImg)
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break
# cap.release()
# cv2.destroyAllWindows()

from cvzone.FaceMeshModule import FaceMeshDetector
import cv2

cap = cv2.VideoCapture(0)
detector = FaceMeshDetector(maxFaces=2)
while True:
    success, img = cap.read()
    img, faces = detector.findFaceMesh(img)
    if faces:
        print(faces[0])
    cv2.imshow("Image", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()