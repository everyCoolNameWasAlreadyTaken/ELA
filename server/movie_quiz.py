
gravity = [
    '/assets/VideoClips/Gravity_Clip1.mp4',
    '/assets/VideoClips/Gravity_Clip2.mp4',
    '/assets/VideoClips/Gravity_Clip3.mp4'
]

bladerunner = [
    '/assets/VideoClips/BladeRunner_Clip1.mp4',
    '/assets/VideoClips/BladeRunner_Clip2.mp4',
    '/assets/VideoClips/BladeRunner_Clip3.mp4'
]

clips = { movie_id_gravity: gravity,
          movie_id_bladerunner: bladerunner
          }

call_random_clip()


call_filter_method()

def combine_data:

    [{
        "clip_address": '/assets/VideoClips/BladeRunner_Clip3.mp4',
        "questions": [
            {
                "question": "bla",
                "answer": "bla"
            }
        ]
    }]


